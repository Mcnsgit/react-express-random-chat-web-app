
// const Socket = io(); // Define Socket here

// document.getElementById('connectButton').addEventListener('click', async () => {
//   const peerConnection = new RTCPeerConnection();
//   if (!peerConnection) {
//     console.error('Failed to create RTCPeerConnection');
//     return;
//   }

//   try {
//     const offer = await peerConnection.createOffer();
//     await peerConnection.setLocalDescription(offer);
//     Socket.emit('signal', { sdp: peerConnection.localDescription });
//     console.log('Offer sent to remote peer via signaling server');
//   } catch (error) {
//     console.error('Error creating offer or setting local description:', error);
//   }
// });

