import React, { FC } from 'react';

interface INewsItemProps {}

const NewsItem: FC<INewsItemProps> = ({}) => {
  return (
    <article className="flex transition hover:shadow-xl">
      <div className="hidden sm:block sm:basis-96">
        <img
          alt="Guitar"
          src="https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
          className="aspect-video h-full w-full rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="border-l border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
          <a href="#">
            <h3 className="text-lg font-bold uppercase text-primaryText">Finding the right guitar for your style - 5 tips</h3>
          </a>
          <p className="line-clamp-3 mt-2 text-sm leading-relaxed text-primaryText">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus pariatur animi temporibus nesciunt praesentium
            dolore sed nulla ipsum eveniet corporis quidem, mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius atque
            dignissimos. Molestias explicabo corporis voluptatem?
          </p>
        </div>
      </div>
    </article>
  );
};

export default NewsItem;
