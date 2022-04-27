import { useState, useEffect } from 'react';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getImages } from 'services/api';
import PropTypes from 'prop-types';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const ImageInfo = ({
  onClick,
  searchQuery,
  page,
  moreButtonRender,
  moreButtonHide,
}) => {
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const [hits, setHits] = useState([]);
  const [loaderOff, setLoaderOff] = useState(false);

  const openLoaderOff = () => {
    setLoaderOff(true);
  };
  const closeLoaderOff = () => {
    setLoaderOff(false);
  };

  useEffect(() => {
    if (searchQuery) {
      (async () => {
        try {
          openLoaderOff();
          const { totalHits: totalHitsNew, hits: newHits } = await getImages(
            searchQuery,
            page
          );
          closeLoaderOff();
          if (totalHitsNew === 0) {
            moreButtonHide();
            Notify.failure(
              `Sorry, images with title ${searchQuery} missing. Try other words.`
            );
          }
          if (
            totalHitsNew === hits.length + newHits.length ||
            (totalHitsNew > 0 && totalHitsNew <= 12)
          ) {
            moreButtonHide();
          }
          if (totalHitsNew > hits.length + newHits.length) {
            moreButtonRender();
          }
          if (page > 1) {
            setHits([...hits, ...newHits]);
            setStatus(Status.RESOLVED);
          }
          if (page === 1) {
            setHits(newHits);
            setStatus(Status.RESOLVED);
            setTotalHits(totalHitsNew);
          }
        } catch (error) {
          setError(error);
          setStatus(Status.REJECTED);
          moreButtonHide();
          Notify.failure(`Sorry, something went wrong.`);
        }
      })();
    }
  }, [searchQuery, page]);

  return (
    <>
      {Status.IDLE && <div></div>}
      {Status.REJECTED && <div></div>}
      {Status.RESOLVED && <ImageGallery hits={hits} onClick={onClick} />}
      {loaderOff ? <Loader /> : null}
    </>
  );
};

ImageInfo.propTypes = {
  onClick: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  moreButtonRender: PropTypes.func.isRequired,
  moreButtonHide: PropTypes.func.isRequired,
};

export default ImageInfo;
