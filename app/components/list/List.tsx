export const UnOrderedList = ({ listItems }) => (
  <ul className="mb-4 pl-6">
    {listItems.map((item) => (
      <li
        className="list-outside list-disc marker:text-2xl marker:text-[#60435F]"
        key={item}
      >
        <div dangerouslySetInnerHTML={{ __html: item}} />
      </li>
    ))}
  </ul>
);

export const OrderedList = ({ listItems }) => (
  <ol className="mb-4 list-decimal pl-6 marker:font-bold">
    {listItems.map((item) => (
      <li className="" key={item}>
        <div dangerouslySetInnerHTML={{ __html: item}} />
      </li>
    ))}
  </ol>
);
