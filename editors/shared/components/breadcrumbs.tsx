import { Fragment, useMemo, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown.js";
import { cn } from "@powerhousedao/design-system/scalars";

type BreadcrumbNode = {
  id: string;
  name: string;
};

interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbNode[];
  onBreadcrumbSelected: (breadcrumb: BreadcrumbNode) => void;
}

const ITEMS_TO_DISPLAY = 3;

export function Breadcrumbs({
  breadcrumbs,
  onBreadcrumbSelected,
}: BreadcrumbsProps) {
  const [open, setOpen] = useState<boolean>(false);

  if (breadcrumbs.length === 0) {
    return null;
  }

  const { items, firstItem, middleItems, lastTwoItems } = useMemo(() => {
    if (breadcrumbs.length <= ITEMS_TO_DISPLAY) {
      return {
        items: breadcrumbs,
      };
    }

    const firstItem = breadcrumbs.slice(0, 1);
    const lastTwoItems = breadcrumbs.slice(-2);
    const middleItems = breadcrumbs.slice(1, -2);

    return {
      firstItem: firstItem[0],
      middleItems,
      lastTwoItems,
    };
  }, [breadcrumbs]);

  return (
    <Breadcrumb className="max-w-full">
      <BreadcrumbList
        className={cn(
          "flex-nowrap max-w-full",
          "[&>li:not([data-ellipsis]):not([role='presentation'])]:flex-grow-1",
          "[&>li:not([data-ellipsis]):not([role='presentation'])]:flex-shrink-1",
          "[&>li:not([data-ellipsis]):not([role='presentation'])]:min-w-32",
        )}
      >
        {/* there are less than `ITEMS_TO_DISPLAY` items, no need to show the ellipsis */}
        {items && items.length > 0 && (
          <>
            {items.map((item, index) => (
              <Fragment key={item.id}>
                {index !== 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem
                  className={cn(
                    index === items.length - 1
                      ? "text-gray-900"
                      : "cursor-pointer text-gray-600",
                  )}
                  onClick={
                    index === items.length - 1
                      ? undefined
                      : () => onBreadcrumbSelected(item)
                  }
                >
                  <span className="truncate">{item.name}</span>
                </BreadcrumbItem>
              </Fragment>
            ))}
          </>
        )}

        {/* From here: there are more than `ITEMS_TO_DISPLAY` items */}
        {firstItem && (
          <BreadcrumbItem>
            <span
              className="truncate cursor-pointer text-gray-600"
              onClick={() => onBreadcrumbSelected(firstItem)}
            >
              {firstItem.name}
            </span>
          </BreadcrumbItem>
        )}

        {middleItems && middleItems.length > 0 && (
          <>
            <BreadcrumbSeparator children="/" className="text-gray-600" />
            <BreadcrumbItem data-ellipsis="true">
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger
                  className="flex items-center gap-1 cursor-pointer"
                  aria-label="Toggle menu"
                >
                  <BreadcrumbEllipsis className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="bg-white max-w-64"
                  align="start"
                >
                  {middleItems.map((item, index) => (
                    <DropdownMenuItem
                      key={index}
                      className="cursor-pointer"
                      onClick={() => onBreadcrumbSelected(item)}
                    >
                      <span className="truncate">{item.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator children="/" className="text-gray-600" />
          </>
        )}

        {lastTwoItems && lastTwoItems.length > 0 && (
          <>
            <BreadcrumbItem
              onClick={() => onBreadcrumbSelected(lastTwoItems[0])}
            >
              <span className="truncate cursor-pointer text-gray-600">
                {lastTwoItems[0].name}
              </span>
            </BreadcrumbItem>
            <BreadcrumbSeparator children="/" className="text-gray-600" />
            <BreadcrumbItem>
              <span className="truncate text-gray-900">
                {lastTwoItems[1].name}
              </span>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
