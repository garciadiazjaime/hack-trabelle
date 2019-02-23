import Link from 'next/link';

function MainMenu() {
  return (
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
      {' '}
      <Link href="/map">
        <a>Map</a>
      </Link>
    </nav>
  );
}

export default MainMenu;
