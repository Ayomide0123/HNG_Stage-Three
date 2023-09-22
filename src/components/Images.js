import React, { useState, useEffect } from 'react';
import './Image.css';
import './Search.css';
import searchIcon from '../img/search.png';
import img1 from '../img/pexels_1.jpeg';
import img2 from '../img/pexels_2.jpeg';
import img3 from '../img/pexels_3.jpeg';
import img4 from '../img/pexels_4.jpeg';
import img5 from '../img/pexels_5.jpeg';
import img6 from '../img/pexels_6.jpeg';
import img7 from '../img/pexels_7.jpeg';
import img8 from '../img/pexels_8.jpeg';
import img9 from '../img/pexels_9.jpeg';
import img10 from '../img/pexels_10.jpeg';
import img11 from '../img/pexels_11.jpeg';
import img12 from '../img/pexels_12.jpeg';
import img13 from '../img/pexels_13.jpeg';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

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

function Images() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [tappedImage, setTappedImage] = useState(null);

  useEffect(() => {
    const preloadImages = async () => {
      const imagesToPreload = initialImages.map((image) => {
        const img = new Image();
        img.src = image.src;
        return img.decode();
      });

      await Promise.all(imagesToPreload)
        .then(() => {
          setImages(initialImages);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error preloading images:', error);
        });
    };

    preloadImages();
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragStart = (event, id) => {
    event.dataTransfer.setData('text/plain', id);
  };

  const handleDrop = (event, targetIndex) => {
    event.preventDefault();
    const draggedImageId = event.dataTransfer.getData('text/plain');
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

    const filteredImages = initialImages.filter((image) => {
      return image.tags.some((tag) =>
        tag.toLowerCase().includes(query.toLowerCase())
      );
    });

    setImages(filteredImages);
  };

  const handleTap = (imageId) => {
    setTappedImage(imageId);
    setTimeout(() => {
      setTappedImage(null);
    }, 300);
  };

  useEffect(() => {
    document.addEventListener('touchstart', (e) => {
      // Handle touch events here
      // Example: You can add specific touch event handling logic here
      // For instance, you can detect touches on specific elements or perform actions on touch events
    });
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
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
            <SortableContext items={images} strategy={verticalListSortingStrategy}>
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className={`image-item ${image.id === tappedImage ? 'tapped' : ''}`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  onClick={() => handleTap(image.id)}
                >
                  <img
                    src={image.src}
                    alt={`Index: ${index + 1}`}
                    className="drag-image"
                    draggable
                    onDragStart={(e) => handleDragStart(e, image.id)}
                  />
                </div>
              ))}
            </SortableContext>
          </div>
        )}
      </div>
    </DndContext>
  );
}

export default Images;
