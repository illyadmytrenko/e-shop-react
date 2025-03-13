import { Breadcrumbs } from "@mui/material";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";

interface CustomBreadcrumbProps {
  className?: string;
  name?: string;
}

export function CustomBreadcrumb({ className, name }: CustomBreadcrumbProps) {
  const currentPath = usePathname();
  const pathSegments = currentPath.split("/").filter(Boolean);

  const formatSegment = (segment: string) =>
    segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className={clsx("mt-5 mb-5 sm:mb-8 lg:mb-12", className)}>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="medium" />}
      >
        <Link
          className="relative after:absolute after:-left-0 after:-bottom-2 hover:text-blue-500 hover:after:w-full hover:after:h-[1.5px] hover:after:bg-blue-500 transition-colors"
          to="/"
        >
          Home
        </Link>
        {pathSegments.map((segment, index) => {
          const url = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          const isNumeric = /^\d+$/.test(segment);

          return (
            <Link
              key={url}
              className={clsx(
                "relative after:absolute after:-left-0 after:-bottom-2 hover:text-blue-500 hover:after:w-full hover:after:h-[1.5px] hover:after:bg-blue-500 transition-colors",
                isLast &&
                  "text-blue-500 after:bg-blue-500 after:w-full after:h-[1.5px]"
              )}
              to={url}
            >
              {isLast && isNumeric && name ? name : formatSegment(segment)}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
