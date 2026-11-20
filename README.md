# REPREMERC
 LEARN-CAP-43765146

Sistema de gestión para el bufete de abogados.

- `frontend/` contiene la aplicación Vue 3 con Vite y el cliente de Supabase.
- `backend/` queda reservado para la API, la lógica del servidor y las migraciones de base de datos.

## Desarrollo local

Con Node.js 24 y npm, ejecuta desde la raíz del repositorio:

```powershell
cd frontend
npm.cmd ci
npm.cmd run dev
```

En el servidor de desarrollo puedes pulsar **Ingresar** para abrir el panel en modo demostración si Supabase todavía no está configurado. Para configurar Supabase, copia `frontend/.env.example` a `frontend/.env.local` y completa `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` con los valores del panel **Connect** de tu proyecto. Reinicia Vite para cargar las variables.

Desde `frontend/`, ejecuta `npm.cmd run build` para generar la compilación de producción.

Cuando Supabase esté configurado, el formulario usa Supabase Auth. Para entrar, usa una cuenta de correo y contraseña existente en **Authentication → Users**. El panel presenta los módulos previstos y todavía no consulta datos del bufete.

## Acceso por invitación

En Supabase, entra en **Authentication → Sign In / Providers** y desactiva **Allow new users to sign up** para cerrar el registro público. En **Authentication → URL Configuration**, configura **Site URL** con la URL de REPREMERC. Para probar desde la misma computadora puedes usar `http://127.0.0.1:5174/`. Para invitar a alguien de forma remota, usa la URL publicada que esa persona pueda abrir.

En **Authentication → Users**, selecciona **Add user → Send invitation**. El enlace predeterminado de Supabase lleva a la pantalla **Aceptar invitación**, donde la persona define su contraseña e ingresa al panel del bufete.

## Organización del frontend

Cada vista reside en `frontend/src/views/` y declara sus estilos particulares en su archivo Vue. El menú principal y el diseño compartido de las pantallas de acceso están en `frontend/src/components/`. En `style.css` están la paleta, la tipografía y los controles compartidos.
