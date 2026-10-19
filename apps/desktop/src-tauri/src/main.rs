#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    if let Err(error) = kalo_desktop_lib::run() {
        eprintln!("Kalo n'a pas pu démarrer : {error}");
    }
}
