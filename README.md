# Hotel La Burna Panoràmic

Web estática (HTML, CSS y JavaScript, sin frameworks) de **laburnahotel.com**.

- Hosting previsto: Wepanel (también el correo).
- Rama principal: `main`. GitHub es siempre la copia buena: `git pull` al empezar y `git push` al terminar.

## Idiomas

| Idioma | Archivo | URL | `lang` | `og:locale` |
|---|---|---|---|---|
| Catalán (principal, `x-default`) | `index.html` | `/` | `ca` | `ca_ES` |
| Español | `es/index.html` | `/es/` | `es` | `es_ES` |
| Inglés | `en/index.html` | `/en/` | `en` | `en_GB` |
| Francés | `fr/index.html` | `/fr/` | `fr` | `fr_FR` |

- Cada página tiene su `canonical` y las cinco etiquetas `hreflang` (ca, es, en, fr y `x-default` → catalán). Si se añade una página nueva, debe llevar las mismas en sus cuatro versiones.
- El selector de idioma (`.lang`) está en las cuatro páginas, con rutas absolutas (`/`, `/es/`, `/en/`, `/fr/`) y `aria-current="page"` en el idioma actual.
- Las cuatro versiones comparten `css/styles.css` y `js/main.js`. Desde las subcarpetas se cargan con `../css/` y `../js/`.
- Los anclajes de las secciones van traducidos:

  | Sección | CA | ES | EN | FR |
  |---|---|---|---|---|
  | Habitaciones | `#habitacions` | `#habitaciones` | `#rooms` | `#chambres` |
  | Vistas | `#vistes` | `#vistas` | `#views` | `#vues` |
  | Servicios | `#serveis` | `#servicios` | `#services` | `#services` |
  | Galería | `#galeria` | `#galeria` | `#gallery` | `#galerie` |
  | Ubicación | `#ubicacio` | `#ubicacion` | `#location` | `#situation` |
  | Reservas | `#reserves` | `#reservas` | `#booking` | `#reservation` |
  | Contacto | `#contacte` | `#contacto` | `#contact` | `#contact` |

## Estructura

```text
index.html        Portada en catalán
avis-legal.html   Aviso legal, privacidad y cookies (CA)
es/aviso-legal.html, en/legal-notice.html, fr/mentions-legales.html   Aviso legal en ES/EN/FR
favicon.ico, apple-touch-icon.png   Iconos (sacados del logo)
es/index.html     Portada en español
en/index.html     Portada en inglés
fr/index.html     Portada en francés
css/styles.css    Estilos comunes
js/main.js        Menú móvil y utilidades comunes
assets/img/       Fotografías del hotel (WebP) e iconos
assets/video/     Vídeo del hero (720p ordenador, 540p móvil)
```

## Secciones preparadas

Habitaciones, servicios, galería, ubicación, reservas y contacto. El motor de reservas irá en el bloque `#motor-reserves`, que tiene el mismo id en los cuatro idiomas.

## Probar en local

Las rutas del selector de idioma son absolutas, así que hay que usar un servidor local con la raíz en esta carpeta (abriendo el archivo con doble clic no funcionan). Por ejemplo, la extensión **Live Server** de VS Code («Go Live») o, si está instalado Python:

```bash
python -m http.server 8000
```

y abrir http://localhost:8000/

## Convenciones

- Si cambias un CSS o un JS, sube su `?v=` en los cuatro HTML que lo cargan.

## Notas de la portada (CA)

- Reservas justo después del hero, como en Valle del Reposo: widget de Octorate en `#motor-reserves` y botones por habitación (`room=346972` doble, `room=347176` triple), con `lang=CA`.
- El mapa de Google se muestra directamente (iframe con `loading="lazy"`). Si se quisiera volver a pedir permiso antes de cargarlo, `js/main.js` ya tiene el código para un bloque `data-map-src` con botón `data-map-load`.
- No hay jardín ni terraza: cada habitación tiene su propio balcón.
- ES/EN/FR traducidas el 9/11 a partir de la portada CA, con `lang=ES/EN/FR` en los enlaces de Octorate, `data-lang="ES/EN/FR"` en el script del buscador y `hl=` en el mapa. El buscador de Octorate no tiene catalán: en la portada CA va sin `data-lang` y sale en el idioma del navegador. Si se cambia un texto de la portada CA, hay que cambiarlo también en `es/`, `en/` y `fr/`.
- Anclajes del aviso legal: CA `#avis-legal` `#privacitat` `#galetes`; ES `#aviso-legal` `#privacidad` `#cookies`; EN `#legal-notice` `#privacy` `#cookies`; FR `#mentions-legales` `#confidentialite` `#cookies`.

## Publicación automática en Wepanel

Cada `git push` a `main` publica la web en Wepanel con GitHub Actions (`.github/workflows/publicar-wepanel.yml`), por FTP.

- Las credenciales van como *secrets* del repositorio en GitHub (Settings → Secrets and variables → Actions): `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` y `FTP_SERVER_DIR`. Nunca en el código.
- Solo sube y actualiza archivos: no borra nada del servidor (la carpeta `.well-known` se queda como está).
- Para ver si ha funcionado: pestaña **Actions** del repositorio en GitHub.
- Si falla la conexión con `ftps`, cambiar `protocol: ftps` por `protocol: ftp` en el workflow.
