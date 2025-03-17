import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import Draggable from 'react-draggable';
import { Icon, IconButton } from '@chakra-ui/react';
import { MdVideocam, MdVideocamOff } from 'react-icons/md';

const DraggableWebcam = ({ isCameraOn, isMicOn, setIsMicOn }) => {


    const webcamRef = useRef(null);
    const dragRef = useRef(null); // Reference for the draggable component

    return (
        <div>

            {isCameraOn && (
                <Draggable nodeRef={dragRef}>
                    <div
                        ref={dragRef}
                        style={{
                            width: '300px',
                            height: '200px',
                            border: '1px solid black',
                        }}
                    >
                        <Webcam
                            audio={isMicOn}
                            ref={webcamRef}
                            videoConstraints={{ facingMode: 'user' }}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>

                </Draggable>
            )}

        </div>
    );
};

export default DraggableWebcam;
