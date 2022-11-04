import React from "react";
import classNames from "classnames";
import Link from "./Link";

interface LogoProps {
  className?: classNames.Argument;
  children: string;
  hrefTitle?: string;
  href?: string;
  splitCharacter?: number;
  asLink?: JSX.Element;
}

/**
 *
 * @visibleName Logo
 */
function Logo(props: LogoProps) {
  const {
    href = "/",
    hrefTitle = "",
    splitCharacter = 12,
    className = "",
    asLink = null,
    children,
  } = props;
  // TODO Better system to split
  const regex = new RegExp(`.{${splitCharacter.toString()}}\\S*\\s+`, "g");
  const arrayStr = children.replace(regex, "$&@").split(/\s+@/);
  const title = arrayStr.reduce(
    (el, a, i) =>
      el.concat(
        a,
        i < arrayStr.length - 1 ? (
          // eslint-disable-next-line react/no-array-index-key
          <br key={i} />
        ) : (
          ""
        )
      ),
    []
  );

  return (
    <Link
      className={classNames(className, "ds-fr--no-shadow")}
      as={asLink}
      title={hrefTitle || children}
      href={href}
    >
      <p className="fr-logo">{title}</p>
    </Link>
  );
}

export default Logo;
