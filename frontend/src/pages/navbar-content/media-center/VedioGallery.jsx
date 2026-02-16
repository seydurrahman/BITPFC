function VideoGallery() {
  return (
    <div className="w-full py-12">
      <div className="max-w-7xl mx-auto px-6 mb-36">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-6">
          Video Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/PYadg3bSHLM"
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-60"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoGallery;
