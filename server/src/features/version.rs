pub async fn handler() -> &'static str {
    env!("CARGO_PKG_VERSION")
}
