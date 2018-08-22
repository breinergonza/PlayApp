using System.Web;
using System.Web.Optimization;

namespace Api
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Login/css").Include(
                "~/assets/css/bootstrap.min.css",
                "~/assets/css/now-ui-kit.css",
                "~//assets/css/demo.css"));

            bundles.Add(new ScriptBundle("~/Login/js").Include(
                "~/assets/js/core/jquery.3.2.1.min.js",
                "~/assets/js/core/popper.min.js",
                "~/assets/js/core/bootstrap.min.js",
                "~/assets/js/now-ui-kit.js"
                ));
        }
    }
}
