export const AuthorCard = ({ author }: any) => (
    <div>
        <div className="w-[300px] relative">
            <img
                className="w-[300px] h-[300px] object-cover"
                src={`http://localhost:1337${author.attributes.picture.data.attributes.url}`}
                alt={`Profile picture of ${author.attributes.name}`}
            />
            <div className="absolute bottom-0 top-[85%] left-[10%] bg-main px-10 py-6 w-[80%]">
                <p>{author.attributes.name || 'No-name-found'}</p>
            </div>
        </div>
        <p className="pt-[20px]">{author.attributes.introduction || 'No-introduction-found'}</p>
    </div>
);
