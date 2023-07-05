FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["SaveUp.Api/SaveUp.Api.csproj", "SaveUp.Api/"]
RUN dotnet restore "SaveUp.Api/SaveUp.Api.csproj"
COPY . .
WORKDIR "/src/SaveUp.Api"
RUN dotnet build "SaveUp.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SaveUp.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SaveUp.Api.dll"]
