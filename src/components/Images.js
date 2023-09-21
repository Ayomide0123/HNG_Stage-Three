import React, { useState, useEffect } from 'react';
import './Image.css';
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
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';

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
  { id: 'image13', src: img13, tags: ['cars'] }
];

function Images() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setImages(initialImages);
      setLoading(false);
    }, 2000);
  }, []);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const draggedImageId = e.dataTransfer.getData('text/plain');
    const updatedImages = [...images];
    const draggedImage = updatedImages.find((image) => image.id === draggedImageId);
    
    if (draggedImage) {
      const currentIndex = updatedImages.findIndex((image) => image.id === draggedImageId);
      updatedImages.splice(currentIndex, 1);
      updatedImages.splice(targetIndex, 0, draggedImage);
      setImages(updatedImages);
    }
  };

  const filterImages = (query) => {
    setSearchQuery(query);

    // Implement your image filtering logic here
    // Update the 'images' state with the filtered images
  };

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
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

        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <div className="image-gallery">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="image-item"
                draggable
                onDragStart={(e) => handleDragStart(e, image.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                <img src={image.src} alt={`Index: ${index + 1}`} />
              </div>
            ))}
          </div>
        )}
      </div>
    </DndProvider>
  );
}

export default Images;
