export default function Header() {
    return (
        <header className="col-span-1 row-span-1 flex flex-col justify-center items-center pt-8">
                    <div>
                        <h1 className="text-8xl">Wine.with.Margaret</h1>
                          <div className="flex py-5 items-center">
                            <div className="flex-grow border-t-2 border-gray-300"></div>
                            <h3 className="flex-shrink text-3xl mx-8">
                              Subtitle goes in this place
                            </h3>
                            <div className="flex-grow border-t-2 border-gray-300"></div>
                          </div>
                    </div>
      </header>
    )
}
