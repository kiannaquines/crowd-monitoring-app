import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

interface FileUploadDropZoneProps {
  onDrop: (acceptedFiles: File[]) => void;
  className?: string;
}

function FileUploadDropZone({ onDrop, className = '' }: FileUploadDropZoneProps) {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    onDrop(acceptedFiles);
    const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file));
    setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop: handleDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    }
  });

  useEffect(() => {
    return () => previews.forEach(preview => URL.revokeObjectURL(preview));
  }, [previews]);

  return (
    <div className="w-full">
      <div 
        {...getRootProps()} 
        className={`w-full p-6 border-2 border-dashed rounded-md text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        } ${className}`}
      >
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p className="text-blue-500">Drop the images here ...</p> :
            <p>Drag &apos;n&apos; drop some images here, or click to select files</p>
        }
      </div>
      {previews.length > 0 && (
        <div className="mt-4 border border-gray-200 rounded-md p-2">
          <p className="text-sm text-gray-500 mb-2">Uploaded Images:</p>
          <div className="max-h-40 overflow-y-auto">
            <div className="grid grid-cols-3 gap-2">
              {previews.map((preview, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUploadDropZone;
