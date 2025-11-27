# Prompt: Publicar nueva versión npm y git

## Pasos para publicar una nueva versión:

1. **Analizar el tipo de cambio y definir la nueva versión:**

   - Leer la versión actual en `package.json` (por ejemplo, 1.0.3).
   - Determinar el tipo de cambio:
     - Si es un fix o mejora menor, incrementar el último dígito (patch): `1.0.X+`.
     - Si es una nueva funcionalidad compatible, incrementar el segundo dígito (minor): `1.X+.0`.
     - Si hay cambios incompatibles, incrementar el primer dígito (major): `X+.0.0`.
   - Definir la nueva versión acorde al cambio realizado.

2. **Actualizar la referencia de versión:**

   - Modificar el campo `version` en `package.json`.
   - Actualizar la versión en las líneas correspondientes de `src/cli.ts` (banner, config, y `.version()`).
   - Actualizar la versión en `templates/AGENT.template.md` si corresponde.

3. **Commit y tag:**

   - Realizar commit de los cambios de versión:
     ```sh
     git add package.json src/cli.ts
     git commit -m "chore: bump version to X.X.X"
     ```
   - Crear el tag correspondiente y subirlo:
     ```sh
     git tag vX.X.X
     git push origin main --tags
     ```

4. **Publicar en npm:**

   - Ejecutar:
     ```sh
     npm publish --access public
     ```

5. **Verificar:**
   - Comprobar que la versión está disponible en npm y el tag en GitHub.

---

> Reemplaza `X.X.X` por la nueva versión definida según el análisis del cambio.
