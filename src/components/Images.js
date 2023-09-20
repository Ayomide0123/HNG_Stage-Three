import React, { useEffect, useState } from 'react';
import './Image.css';
import './Search.css';
import searchIcon from '../img/search.png';
import img1 from '../img/pexels_1.jpg';
import img2 from '../img/pexels_2.jpg';
import img3 from '../img/pexels_3.jpg';
import img4 from '../img/pexels_4.jpg';
import img5 from '../img/pexels_5.jpg';
import img6 from '../img/pexels_6.jpg';
import img7 from '../img/pexels_7.jpg';
import img8 from '../img/pexels_8.jpg';
import img9 from '../img/pexels_9.jpg';
import img10 from '../img/pexels_10.jpg';
import img11 from '../img/pexels_11.jpg';
import img12 from '../img/pexels_12.jpg';
import img13 from '../img/pexels_13.jpg';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function Images() {
  const initialImages = [
    { id: 'image1', src: img1, tags: ['animals'] },
    { id: 'image2', src: img2, tags: ['animals'] },
    { id: 'image3', src: img3, tags: ['animals'] },
    { id: 'image4', src: img4, tags: ['animals'] },
    { id: 'image5', src: img5, tags: ['animals'] },
    { id: 'image6', src: img6, tags: ['cars'] },
    { id: 'image7', src: img7, tags: ['books'] },
    { id: 'image8', src: img8, tags: ['books'] },
    { id: 'image9', src: img9, tags: ['books'] },
    { id: 'image10', src: img10, tags: ['cars'] },
    { id: 'image11', src: img11, tags: ['books'] },
    { id: 'image12', src: img12, tags: ['cars'] },
    { id: 'image13', src: img13, tags: ['cars'] },
  ];

  // Initialize images with all images
  const [images, setImages] = useState(initialImages);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedImages = [...images];
    const [reorderedImage] = updatedImages.splice(result.source.index, 1);
    updatedImages.splice(result.destination.index, 0, reorderedImage);

    setImages(updatedImages);
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [searchQuery, setSearchQuery] = useState('');

  const filterImages = (query) => {
    setSearchQuery(query);

    // Filter images based on the search query
    const filtered = initialImages.filter((image) =>
      image.tags.includes(query.toLowerCase())
    );

    // Update images with filtered images, or reset to initialImages if query is empty
    setImages(query ? filtered : initialImages);
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for Images (e.g animals, cars, books..)"
          className="search-input"
          value={searchQuery}
          onChange={(e) => filterImages(e.target.value)}
        />
        <button className="search-button">
          <img src={searchIcon} alt="search button" />
        </button>
      </div>

      <div className="image-gallery">
        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <div className="imgContainer">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="image-list" direction="horizontal">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="image-list"
                  >
                    {images.map((image, index) => (
                      <Draggable
                        key={image.id}
                        draggableId={image.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="listed"
                          >
                            <img src={image.src} alt={`Index: ${index + 1}`} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        )}
      </div>
    </div>
  );
}

export default Images;
