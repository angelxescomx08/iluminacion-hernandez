"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

export const Header = () => {
	// Estado simulado de usuario (sin conexión real)
	const [isLoggedIn] = useState(true);

	const navigationItems = [
		{ href: "/tienda", label: "Tienda" },
		{ href: "/marcas", label: "Marcas" },
		{ href: "/contacto", label: "Contacto" },
	];

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
				{/* Logo */}
				<Link
					className="flex items-center space-x-2 font-semibold text-primary"
					href="/"
				>
					<span className="text-xl">Iluminación Hernández</span>
				</Link>

				{/* Navegación Desktop */}
				<nav className="hidden md:flex md:items-center md:space-x-6">
					{navigationItems.map((item) => (
						<Link
							className="font-medium text-foreground text-sm transition-colors hover:text-primary"
							href={item.href}
							key={item.href}
						>
							{item.label}
						</Link>
					))}
				</nav>

				{/* Acciones del usuario - Desktop */}
				<div className="hidden md:flex md:items-center md:space-x-4">
					{isLoggedIn ? (
						<div className="flex items-center space-x-3">
							<Avatar className="bg-primary font-medium text-primary-foreground text-sm">
								<AvatarFallback>U</AvatarFallback>
							</Avatar>
							<span className="font-medium text-foreground text-sm">
								Usuario
							</span>
						</div>
					) : (
						<Button asChild size="sm" variant="outline">
							<Link href="/login">Iniciar Sesión</Link>
						</Button>
					)}
				</div>

				{/* Menú Mobile */}
				<Sheet>
					<SheetTrigger asChild className="md:hidden">
						<Button aria-label="Abrir menú" size="icon" variant="ghost">
							<MenuIcon className="size-6" />
						</Button>
					</SheetTrigger>
					<SheetContent
						className="flex w-full flex-col p-0 sm:w-[400px]"
						side="right"
					>
						<div className="flex flex-1 flex-col">
							{/* Header del menú */}
							<SheetHeader className="border-b px-6 py-5">
								<SheetTitle className="text-left font-semibold text-lg">
									Menú de navegación
								</SheetTitle>
							</SheetHeader>

							{/* Navegación principal */}
							<nav className="flex-1 px-4 py-6">
								<ul className="flex flex-col gap-2">
									{navigationItems.map((item) => (
										<li key={item.href}>
											<SheetClose asChild>
												<Link
													className="flex h-12 items-center rounded-lg px-4 font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground active:bg-accent/80"
													href={item.href}
												>
													{item.label}
												</Link>
											</SheetClose>
										</li>
									))}
								</ul>
							</nav>

							{/* Sección de usuario */}
							<div className="border-t bg-muted/30 px-4 py-6">
								{isLoggedIn ? (
									<div className="flex items-center gap-3 rounded-lg bg-background p-4 shadow-sm">
										<Avatar className="size-12 shrink-0 bg-primary font-semibold text-primary-foreground">
											<AvatarFallback>U</AvatarFallback>
										</Avatar>
										<div className="flex min-w-0 flex-1 flex-col">
											<span className="truncate font-semibold text-base text-foreground">
												Usuario
											</span>
											<span className="text-muted-foreground text-xs">
												Sesión activa
											</span>
										</div>
									</div>
								) : (
									<SheetClose asChild>
										<Button
											asChild
											className="h-12 w-full font-medium"
											variant="outline"
										>
											<Link href="/login">Iniciar Sesión</Link>
										</Button>
									</SheetClose>
								)}
							</div>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
};
