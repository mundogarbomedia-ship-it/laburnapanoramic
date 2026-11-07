# Hotel La Burna Panoràmic

Web estática (HTML, CSS y JavaScript, sin frameworks) de **laburnahotel.com**.

- Hosting previsto: Wepanel (también el correo).
- Rama principal: `main`. GitHub es siempre la copia buena: `git pull` al empezar y `git push` al terminar.

## Idiomas

| Idioma | Ruta | Estado |
|---|---|---|
| Catalán (principal, `x-default`) | `/` | Estructura inicial |
| Español | `/es/` | Pendiente |
| Inglés | `/en/` | Pendiente |
| Francés | `/fr/` | Pendiente |

## Estructura

```text
index.html        Portada (catalán)
css/styles.css    Estilos
js/main.js        Menú móvil y utilidades
assets/img/       Fotografías del hotel
```

## Secciones preparadas

Habitaciones, servicios, galería, ubicación, reservas (motor de reservas en `#motor-reserves`) y contacto. Todas muestran «Properament» hasta tener la información real del hotel: no se inventan tarifas, fotografías ni servicios.

## Convenciones

- Si cambias un CSS o un JS, sube su `?v=` en los HTML que lo cargan.
