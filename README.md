Elección API 
Los dos parámetros para elegir la API son: 
Se acople con los proyectos y servicios que ofrece Linktic
Que sea una API que el código pueda ser reutilizado en futuros proyectos. 

La API Elegida es API-Colombia, esta api permite ver datos muy específicos sobre Colombia, desde las ciudades, departamentos,presidentes, lugares turísticos y naturales, etc. 

Esta API se alinea con LinkTic dado que muchos proyectos trabajados por la empresa han sido desarrollados con el Gobierno de Colombia y hay módulos que se podrían reutilizar en dichos proyectos. 

2. Planteamiento de la aplicación

Se plantea una aplicación de presentación del país Colombia, mostrar datos generales del país, mostrar el país por regiones y en esta subvenciones mostrar los departamentos, así ir desglosando información que puede ser útil para turistas como para profesores de geografía enseñar a sus alumnos. 

Plan de Diseño: App "Colombia Info"
1. Arquitectura Global (Layout Principal)
Estos elementos estarán presentes en todas las pantallas de la aplicación para mantener la consistencia de navegación.
Header Superior:
Logotipo/Nombre de la App.
Posiblemente un menú de perfil o configuración (opcional).
Navbar (Barra de Navegación):
Puede ser una barra lateral (Sidebar) o superior, conteniendo las siguientes rutas de navegación:
Home / Inicio (Ruta actual).
Ciudades.
Lugares Turísticos.

2. Estructura de la Página de Inicio (Home)
Esta vista consumirá los datos del JSON proporcionado id: 1 y una API externa para el cambio de moneda.
A. Sección Hero (Visual Impact)
Contenido:
Ilustración o render 3D del Mapa de Colombia.
Elementos decorativos superpuestos o al lado: Aves (ej. Colibríes), Orquídeas, o palmas de cera.
Título grande: json.name ("Colombia").
Bandera pequeña: json.flags.
B. Sección Descriptiva
Contenido:
Texto narrativo tomado de json.description.
Diseño: Un bloque de texto limpio y legible, quizás con un fondo sutil para separar del Hero.
C. Sección Demográfica , Geográfica e 
Visualización: Tarjetas (Cards) o Iconos con datos clave.
Datos:
Población: json.population (52,235,050).
Superficie: json.surface (1,141,748 km²).
Idiomas: Ïnglès 
Los datos nùmericos se presentan como un incremento desde el 0 hasta el nùmero elegido, esto elegido asì para darle un mejor experiencia al usuaio. 
D. Sección de lugares turísticos
Se crea un pantalla que posee tres elementos dos en diagonal y uno de frente y se muestran de forma aleatoria los sitios turisticoo

2. Estructura de la Página de lugares Atractivos
En la segunda página tendremos un carrusel  y en este se mostrarán todos los datos de lujuria pul,   
2. Estructura de la ciudades
En esta pantalla se obtienen todos los datos de las ciudades  y se crea un filtro para buscar ciudades


Entre puntos importantes tuve en cuenta el manejo de errores para cuando la API arroja error, se agrega validación de datos usando un spinner mientràs carga la pantalla. Y se separa en módulos y servicios- 


Para inializar este proyecto solo debes corres primero 

npm -i 

Posteriormente a esto se usa  el comando:
ng serve

para inicial la apliaciòn 
