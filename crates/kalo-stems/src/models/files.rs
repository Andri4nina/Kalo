/// File name, size in bytes and SHA-256 of each half-precision network.
pub const FILES: [(&str, u64, &str); 4] = [
    (
        "vocals.fp16.onnx",
        19_714_141,
        "db47148ab1c52709ce694893f532c91abfe3edc4d46238939570e036a22878ca",
    ),
    (
        "drums.fp16.onnx",
        19_714_140,
        "7ae4002e5633634674f74dc3356d5875b0da894d59ce0f60e844bb8f9cb8aa92",
    ),
    (
        "bass.fp16.onnx",
        19_714_139,
        "ba4c4949a27222492cca49859901a873b4b71461dc48c7c5a51f93d31eb11f55",
    ),
    (
        "other.fp16.onnx",
        19_714_140,
        "3cc59116cb7195946ab9596d8ca25984d09c0f8a70db8cf85d063132f97bc61d",
    ),
];
