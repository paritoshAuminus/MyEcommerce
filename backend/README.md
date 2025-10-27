- Fire up the json-server: `npx json-server db.json`

Examples

Fetch a single note (replace <USER_ID> and <NOTE_ID>):

PowerShell (pwsh):
```
Invoke-RestMethod -Method Get -Uri "http://localhost:8080/notes/1" -Headers @{"x-user-id"="1"}
```

curl:
```
curl -H "x-user-id: 1" http://localhost:8080/notes/1
```

Create a new note:

PowerShell (pwsh):
```
Invoke-RestMethod -Method Post -Uri "http://localhost:8080/notes" -Headers @{"x-user-id"="1";"Content-Type"="application/json"} -Body '{"title":"New note","content":"Note body"}'
```

curl:
```
curl -X POST -H "Content-Type: application/json" -H "x-user-id: 1" -d '{"title":"New note","content":"Note body"}' http://localhost:8080/notes
```