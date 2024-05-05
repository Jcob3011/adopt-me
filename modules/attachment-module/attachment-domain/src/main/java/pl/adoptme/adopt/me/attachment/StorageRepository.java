package pl.adoptme.adopt.me.attachment;

interface StorageRepository {
    String save(byte[] file, String id);

    byte[] get(String path);

    void delete(String path);
}
