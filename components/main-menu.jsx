import Link from 'next/link';

function MainMenu() {
  return (
    <nav>
      <Link href="/travel">
        <a>Map</a>
      </Link>
      {' '}
      <Link href="/request">
        <a>Photographer</a>
      </Link>
      {' '}
      <Link href="/camera">
        <a>Camera</a>
      </Link>
    </nav>
  );
}

export default MainMenu;
