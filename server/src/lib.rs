mod features;

use axum::{Router, routing::get};

/// Builds the application router.
pub fn app() -> Router {
    Router::new()
        .route("/health", get(features::health::handler))
        .route("/api/version", get(features::version::handler))
}
