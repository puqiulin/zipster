#[macro_export]
macro_rules! handle_result {
    ($stat: expr) => {
        match $stat {
            Ok(v) => Ok(v),
            Err(e) => Err(format!("{}", e.to_string())),
        }
    };
}
