export default function Header() {
  return (
    <nav className="h-[120px] flex items-center gap-10 px-3 bg-black">
      <img src="/logo.png" width="200" height="89" alt="logo" />
      <ul className="gap-10 text-white text-xl font-semibold uppercase hidden md:flex">
        <li>
          <a className="" href="/">
            Trang chủ
          </a>
        </li>
        <li>
          <a className="" href="#">
            Giới thiệu
          </a>
        </li>
        <li>
          <a className="" href="#">
            Liên hệ
          </a>
        </li>
      </ul>
    </nav>
  );
}
