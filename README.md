Biblioteca Dashboard

Dashboard web desarrollado para la gestión y análisis de información bibliográfica, diseñado para brindar a administradores y responsables de bibliotecas una visión integral sobre el estado del catálogo, préstamos, disponibilidad y métricas de rendimiento, facilitando la toma de decisiones basada en datos.

Objetivo

El proyecto fue concebido como una plataforma de Business Intelligence orientada a bibliotecas, permitiendo centralizar información relevante y visualizar indicadores clave mediante paneles interactivos y reportes dinámicos.

Características Principales
Gestión y consulta de información bibliográfica almacenada en base de datos.
Visualización de métricas y estadísticas sobre el catálogo de libros.
Dashboard interactivo con navegación tipo Drill Down para explorar información desde indicadores generales hasta datos específicos.
Semaforización visual para identificar rápidamente el estado y desempeño de los libros según su nivel de circulación y demanda.
Sistema de autenticación y autorización de usuarios mediante Clerk.
Consultas optimizadas a base de datos para obtener información relevante en tiempo real.
Interfaz responsive y moderna orientada a la experiencia del usuario.
Tecnologías Utilizadas
Frontend
Next.js
React
TypeScript
Tailwind CSS
shadcn/ui
Backend y Persistencia
Node.js
Prisma ORM
MySQL
Autenticación
Clerk Authentication
Arquitectura

La aplicación fue desarrollada utilizando TypeScript en toda la solución, implementando una arquitectura basada en componentes reutilizables y separación de responsabilidades entre presentación, lógica de negocio y acceso a datos.

Prisma ORM fue utilizado para abstraer el acceso a la base de datos MySQL, facilitando la construcción de consultas tipadas y seguras, mientras que Clerk se encargó de la gestión de usuarios, autenticación y control de acceso.

Funcionalidades Analíticas
Indicadores de rendimiento del catálogo.
Análisis de disponibilidad de libros.
Estadísticas de préstamos y circulación.
Clasificación visual mediante semaforización.
Navegación Drill Down para profundizar en los datos.
Soporte para consultas estratégicas orientadas a la toma de decisiones.
Aprendizajes del Proyecto

Durante el desarrollo se aplicaron conceptos de:

Desarrollo Full Stack con TypeScript.
Diseño de dashboards analíticos.
Integración de servicios SaaS.
Gestión de autenticación y autorización.
Modelado de bases de datos relacionales.
Consumo y optimización de consultas mediante Prisma ORM.
Desarrollo colaborativo utilizando Git y GitHub.
