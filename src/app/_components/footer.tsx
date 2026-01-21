export const Footer = () => {
	return (
		<footer className="border-t bg-muted/30">
			<div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{/* Información de la empresa */}
					<div className="flex flex-col space-y-4">
						<h3 className="font-semibold text-base text-foreground">
							Iluminación Hernández
						</h3>
						<p className="text-muted-foreground text-sm">
							Especialistas en iluminación para tu hogar y negocio.
						</p>
					</div>

					{/* Contacto */}
					<div className="flex flex-col space-y-4">
						<h3 className="font-semibold text-base text-foreground">
							Contacto
						</h3>
						<ul className="flex flex-col space-y-2">
							<li>
								<a
									className="text-muted-foreground text-sm transition-colors hover:text-primary"
									href="tel:+525555124169"
								>
									(+52) 55 5512 4169
								</a>
							</li>
							<li>
								<a
									className="text-muted-foreground text-sm transition-colors hover:text-primary"
									href="tel:+525570471875"
								>
									(+52) 55 7047 1875
								</a>
							</li>
							<li>
								<a
									className="text-muted-foreground text-sm transition-colors hover:text-primary"
									href="mailto:ventas@iluminacionhernandez.com"
								>
									ventas@iluminacionhernandez.com
								</a>
							</li>
						</ul>
					</div>

					{/* Horarios */}
					<div className="flex flex-col space-y-4">
						<h3 className="font-semibold text-base text-foreground">
							Horarios
						</h3>
						<p className="text-muted-foreground text-sm">
							Lun - Sab: 9:00 AM - 18:00 PM
						</p>
					</div>

					{/* Dirección */}
					<div className="flex flex-col space-y-4">
						<h3 className="font-semibold text-base text-foreground">
							Dirección
						</h3>
						<address className="text-muted-foreground text-sm not-italic">
							Victoria #31 local 101, Col. Centro,
							<br />
							CP 06050, CDMX
						</address>
					</div>
				</div>

				{/* Copyright */}
				<div className="mt-8 border-t pt-6 text-center">
					<p className="text-muted-foreground text-xs">
						© {new Date().getFullYear()} Iluminación Hernández. Todos los
						derechos reservados.
					</p>
				</div>
			</div>
		</footer>
	);
};
