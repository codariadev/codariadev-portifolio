import Link from 'next/link';

export default function Header() {
  return (
    <header className="absolute w-full">
      <nav className="w-full px-6 py-4 flex justify-between items-center px-20">
        <a href="#">
          <img src="logo2.png" alt="" width={100} />
        </a>
        <ul className='flex gap-5'>
            <a href='#'>Sobre</a>
            <a href='#'>Habilidades</a>
            <a href='#'>Portifólio</a>
            <a href='#'>Contato</a>
        </ul>
      </nav>
    </header>
  );
}