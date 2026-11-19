# Tiny local web server for the VAMSHAA site. Needs nothing installed (uses Windows PowerShell).
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 8080
$types = @{ '.html'='text/html; charset=utf-8'; '.css'='text/css'; '.js'='application/javascript'; '.png'='image/png'; '.jpg'='image/jpeg'; '.mp4'='video/mp4'; '.woff2'='font/woff2'; '.json'='application/json'; '.svg'='image/svg+xml' }
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
try { $listener.Start() } catch { Write-Host "Could not start on port $port. Is another server already running?"; Read-Host "Press Enter to close"; exit 1 }
Write-Host "VAMSHAA site running at http://localhost:$port  (close this window to stop)"
Start-Process "http://localhost:$port/"
while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $path = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
  if ($path -eq '') { $path = 'index.html' }
  $file = Join-Path $root $path
  $res = $ctx.Response
  try {
    if ((Test-Path $file -PathType Leaf) -and ((Resolve-Path $file).Path.StartsWith($root))) {
      $bytes = [System.IO.File]::ReadAllBytes($file)
      $ext = [System.IO.Path]::GetExtension($file).ToLower()
      $res.ContentType = if ($types.ContainsKey($ext)) { $types[$ext] } else { 'application/octet-stream' }
      $res.ContentLength64 = $bytes.Length
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else { $res.StatusCode = 404 }
  } catch { } finally { $res.Close() }
}
