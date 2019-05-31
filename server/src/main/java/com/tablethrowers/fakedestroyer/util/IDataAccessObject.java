package com.tablethrowers.fakedestroyer.util;

import java.util.List;

public interface IDataAccessObject {

    public <T> void save(T c);
    public <T> T getById(Class<T> c, int id);
    public <T> List<T> getAll(Class<T> c);
    public <T> boolean deleteByID(Class <T>c, int id);
    public <T> List<T> getByStringValue(Class<T> c, String key, String value);
    public <T> List<T> getByIntegerValue(Class<T> c, String key, int value);
    public <T> void updateIntegerValueByStringValue(Class<T>c, String uKey, int uValue, String pKey, String pValue);
}
