document.getElementById('connectButton').addEventListener('click', () => {
  if (!peerConnection) startPeerConnection();
  peerConnection.createOffer()
      .then(offer => peerConnection.setLocalDescription(offer))
      .then(() => {
          socket.emit('signal', { sdp: peerConnection.localDescription });
      });
  alert('Connect button clicked!');
});
