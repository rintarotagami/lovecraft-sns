import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FiX } from 'react-icons/fi';
import Image from 'next/image'; 

interface DraggableImagePreviewProps {
    index: number;
    preview: string;
    moveImage: (dragIndex: number, hoverIndex: number) => void;
    removeImage: () => void;
}

const DraggableImagePreview: React.FC<DraggableImagePreviewProps> = ({ index, preview, moveImage, removeImage }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'IMAGE',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: 'IMAGE',
        hover(item: { index: number }) {
            if (item.index !== index) {
                moveImage(item.index, index);
                item.index = index;
            }
        },
    });

    return (
        <div
            ref={node => {
                drag(drop(node));
            }}
            className={`relative rounded-lg overflow-hidden shadow-md ${isDragging ? 'opacity-50' : ''}`}
        >
            <Image src={preview} alt={`プレビュー ${index + 1}`} className="w-full h-auto object-cover" />
            <button
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-300"
            >
                <FiX />
            </button>
        </div>
    );
};

export default DraggableImagePreview;
