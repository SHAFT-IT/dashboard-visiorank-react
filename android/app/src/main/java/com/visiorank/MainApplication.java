package com.visiorank;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.github.alinz.reactnativewebviewbridge.WebViewBridgePackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.github.wuxudong.rncharts.MPAndroidChartPackage;
import com.reactlibrary.RNDefaultPreferencePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import org.pgsqlite.SQLitePluginPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.filepicker.FilePickerPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new SQLitePluginPackage(),   // register SQLite Plugin here
        new MainReactPackage(),
            new WebViewBridgePackage(),
        new RNFetchBlobPackage(),
        new MapsPackage(),
        new MPAndroidChartPackage(),
        new RNDefaultPreferencePackage(),
        new VectorIconsPackage(),
        new FilePickerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
