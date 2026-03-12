import { forwardRef } from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import { cn } from "@/lib/utils";

const AspectRatio = forwardRef(function AspectRatio(
	{ className, ...props },
	ref,
) {
	return (
		<AspectRatioPrimitive.Root
			ref={ref}
			className={cn("overflow-hidden", className)}
			{...props}
		/>
	);
});

export { AspectRatio };
