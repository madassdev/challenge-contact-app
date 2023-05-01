
# [Task Challenge]: Contact Application

This is a laravel based Contact Management Application with intuitive UI and UX to create and manage contacts.

The contact details used include:
name, email, phone, image, lat (latitide), lng (longitude) and categories

List of contacts can be viewed on the /contacts page.

Contacts can be searched by name, email or phone, and can also be filtered by multiple categories

Contacts can be edited and deleted as desired.



## Installation

Install project by cloning repository, enter the project folder and:

1.  Install package dependencies
```bash
  composer install
```
2.  Install npm packages 

```bash
  npm install
```
3. Build the frontend with:
```bash
  npm run build
```
4. Run migrations and seeder (Please setup db config in env)
```bash
  php artisan migrate:fresh --seed
```
5. Link storage (for stored images)
```bash
  php artisan storage:link
```
6. Serve application (or use local server)
```bash
  php artisan serve
```