import clsx from 'clsx';
import { Mail, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

// interface LandingFooterProps extends HTMLAttributes<HTMLDivElement> {}

const LandingFooter = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <footer
      className={clsx(
        'flex flex-col items-center justify-center gap-3 pt-30 pb-22 md:mt-40 md:h-25 md:flex-row md:justify-between md:px-0 md:py-0',
        className,
      )}
    >
      <p className="text-taskify-xs-normal text-taskify-neutral-400 md:text-taskify-lg-regular">
        <Link href="/">@codeit - 2023</Link>
      </p>
      <ul className="text-taskify-xs-normal text-taskify-neutral-400 md:text-taskify-lg-regular flex items-center justify-between gap-5 md:grow-1 md:justify-center md:gap-8">
        <li>
          <Link href="/">Privacy Policy</Link>
        </li>
        <li>
          <Link href="/">FAQ</Link>
        </li>
      </ul>
      <ul className="mt-14 flex items-center justify-between gap-5 md:mt-0 md:gap-3.5">
        <li>
          <Link href="/">
            <Mail className="h-4 w-4 md:h-5.5 md:w-5.5" strokeWidth={2} />
          </Link>
        </li>
        <li>
          <Link href="/">
            <Facebook className="h-4 w-4 md:h-5.5 md:w-5.5" strokeWidth={2} />
          </Link>
        </li>
        <li>
          <Link href="/">
            <Instagram className="h-4 w-4 md:h-5.5 md:w-5.5" strokeWidth={2} />
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default LandingFooter;
