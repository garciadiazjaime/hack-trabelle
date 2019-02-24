import Link from 'next/link';

function MainMenu() {
  return (
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
      {' '}
      <Link href="/travel">
        <a>Map</a>
      </Link>
    </nav>
  );
}

export default MainMenu;
