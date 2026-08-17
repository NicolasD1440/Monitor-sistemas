# 🖥️ Monitor de Servidor

Sistema web para monitorear y administrar un servidor Linux desde una interfaz web.

El proyecto permite consultar métricas del servidor, administrar contenedores Docker, realizar acciones sobre el sistema y gestionar backups asociados a Oracle Cloud Infrastructure (OCI).

---

## 📋 Características

### 📊 Monitoreo

- Uso de CPU
- Uso de memoria RAM
- Uso de almacenamiento
- Espacio disponible en disco
- Procesos activos del sistema

### 🖥️ Administración del servidor

- Actualización del sistema
- Reinicio del servidor
- Consulta del estado del sistema

### 🐳 Administración de Docker

- Listar contenedores
- Consultar estado de los contenedores
- Reiniciar un contenedor específico
- Reiniciar todos los contenedores

### ☁️ Oracle Cloud Infrastructure

- Gestión de backups
- Consulta de backups disponibles
- Automatización de tareas relacionadas con OCI

---

# 🏗️ Arquitectura

El proyecto está dividido en tres componentes principales:

```text
                    ┌─────────────────────┐
                    │      Navegador      │
                    │      React/Vite     │
                    └──────────┬──────────┘
                               │
                               │ HTTPS
                               ▼
                    ┌─────────────────────┐
                    │        Nginx        │
                    │     Reverse Proxy   │
                    └──────┬───────┬──────┘
                           │       │
              ┌────────────┘       └─────────────┐
              ▼                                  ▼
     ┌─────────────────┐                ┌─────────────────┐
     │ Flask Backend   │                │   HostAgent     │
     │    :5001        │                │      :6000      │
     └────────┬────────┘                └────────┬────────┘
              │                                  │
              ▼                                  ▼
       Monitorización                       Docker Host
       del sistema                         y servicios
