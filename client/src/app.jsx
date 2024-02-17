import React from 'react';
import { VideoChatProvider } from '../../contexts/VideoChatContext';
import { VideoChat } from './components/videoChat';

const App = () => {
    return (
        <VideoChatProvider>
            <VideoChat />
        </VideoChatProvider>
    );
}

export default App