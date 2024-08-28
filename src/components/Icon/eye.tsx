const Eye = ({ className }: { className: string }) => {
  return (
    <svg
      className={`${className}`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.0013 3C4.66797 3 1.8213 5.07333 0.667969 8C1.8213 10.9267 4.66797 13 8.0013 13C11.3346 13 14.1813 10.9267 15.3346 8C14.1813 5.07333 11.3346 3 8.0013 3ZM8.0013 11.3333C6.1613 11.3333 4.66797 9.84 4.66797 8C4.66797 6.16 6.1613 4.66667 8.0013 4.66667C9.8413 4.66667 11.3346 6.16 11.3346 8C11.3346 9.84 9.8413 11.3333 8.0013 11.3333ZM8.0013 6C6.89464 6 6.0013 6.89333 6.0013 8C6.0013 9.10667 6.89464 10 8.0013 10C9.10797 10 10.0013 9.10667 10.0013 8C10.0013 6.89333 9.10797 6 8.0013 6Z"
        fill="#FBFBFB"
      />
    </svg>
  );
};

export default Eye;
