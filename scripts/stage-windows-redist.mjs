// Rassemble les DLL que l'exécutable Windows importe et qu'un Windows neuf
// n'a pas : DirectML (ONNX Runtime) et le runtime Visual C++ (déploiement
// local autorisé par Microsoft). Destination : src-tauri/redist/.
import { copyFileSync, existsSync, mkdirSync, readdirSync, realpathSync } from "node:fs";
import { join } from "node:path";

const out = "apps/desktop/src-tauri/redist";
const runtime = ["msvcp140.dll", "msvcp140_1.dll", "vcruntime140.dll", "vcruntime140_1.dll"];

const subdirs = (dir) => (existsSync(dir) ? readdirSync(dir).map((name) => join(dir, name)) : []);

function vcRuntimeDir() {
  if (process.env.VCToolsRedistDir) return join(process.env.VCToolsRedistDir, "x64", "Microsoft.VC143.CRT");
  const roots = ["C:/Program Files/Microsoft Visual Studio", "C:/Program Files (x86)/Microsoft Visual Studio"];
  const found = roots
    .flatMap(subdirs)
    .flatMap(subdirs)
    .flatMap((edition) => subdirs(join(edition, "VC/Redist/MSVC")))
    .map((version) => join(version, "x64/Microsoft.VC143.CRT"))
    .filter((dir) => existsSync(join(dir, "msvcp140.dll")));
  return found.sort().at(-1);
}

function directMl() {
  const built = "target/release/DirectML.dll";
  if (existsSync(built)) return realpathSync(built);
  const cache = join(process.env.LOCALAPPDATA ?? "", "ort.pyke.io/dfbin/x86_64-pc-windows-msvc");
  return subdirs(cache).map((dir) => join(dir, "DirectML.dll")).find(existsSync);
}

const vc = vcRuntimeDir();
const dml = directMl();
if (!vc || !dml) {
  console.error(`Introuvable : ${vc ? "" : "runtime Visual C++ "}${dml ? "" : "DirectML.dll (compilez d'abord kalo-stems en release)"}`);
  process.exit(1);
}
mkdirSync(out, { recursive: true });
copyFileSync(dml, join(out, "DirectML.dll"));
for (const name of runtime) copyFileSync(join(vc, name), join(out, name));
console.log(`DLL copiées dans ${out} (runtime : ${vc})`);
