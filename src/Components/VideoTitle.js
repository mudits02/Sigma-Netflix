const VideoTitle = ({title , overview}) => {
    return(
        <div className="pt-36 px-12">
            <h1 className="text-6xl font-bold">{title}</h1>
            <p className="text-lg py-6 w-1/4">{overview}</p>
            <div>
                <button className="bg-gray-400 text-xl text-white p-4 px-16 rounded-lg ">▶️ Play</button>
                <button className="mx-2 bg-gray-400 text-xl text-white p-4 px-16">More Info</button>
            </div>
        </div>
    )
}

export default VideoTitle;