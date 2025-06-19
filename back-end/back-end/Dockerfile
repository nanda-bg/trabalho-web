FROM eclipse-temurin:21-jre

WORKDIR /app

RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup

# Copia o JAR da aplicação
COPY target/*.jar app.jar

# Copia o arquivo de credenciais do Firebase
COPY src/main/resources/serviceAccountKey.json /app/serviceAccountKey.json

RUN chown -R appuser:appgroup /app
USER appuser

# Expõe a porta da aplicação
EXPOSE 8080

# Define variáveis de ambiente para produção
ENV SPRING_PROFILES_ACTIVE=prod

# Comando de inicialização
ENTRYPOINT ["java", "-jar", "app.jar"]
