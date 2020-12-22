using Perplex.ContentBlocks.Definitions;
using System;
using System.Collections.Generic;
using System.Linq;
using Umbraco.Core.Composing;

namespace _24days.Web.PerplexContentBlocks
{
    public class PerplexCallToAction : IContentBlockDefinition
    {
        public Guid Id => Guid.Parse("a855eefd-c0b3-4074-b566-2544089dc704");

        public string Name => "Perplex Call To Action";

        public string Description => "A call to action content block";

        public string PreviewImage => "/PerplexContentBlocks/cta.jpg";

        public int? DataTypeId => 1082;

        public Guid? DataTypeKey => Guid.Parse("82dc6276-6037-4bab-8719-5c4a3cc65c3e");

        public IEnumerable<Guid> CategoryIds => new[] { Perplex.ContentBlocks.Constants.Categories.Content };

        public IEnumerable<IContentBlockLayout> Layouts => new IContentBlockLayout[] { new PerplexCallToActionLayout() };

        public IEnumerable<string> LimitToDocumentTypes => Enumerable.Empty<string>();

        public IEnumerable<string> LimitToCultures => Enumerable.Empty<string>();
    }

    public class PerplexCallToActionLayout : IContentBlockLayout
    {
        public Guid Id => Guid.Parse("78a9e5bc-ced5-43c8-a4d3-0777f18ed62e");

        public string Name => "Call To Action";

        public string Description => "Generic Call To Action";

        public string PreviewImage => "/PerplexContentBlocks/cta.jpg";

        public string ViewPath => "/views/partials/perplex/calltoaction.cshtml";
    }


    public class PerplexComponent : IComponent
    {

        private readonly IContentBlockDefinitionRepository _definitions;

        public PerplexComponent(IContentBlockDefinitionRepository definitions)
        {
            _definitions = definitions;
        }

        public void Initialize()
        {
            var block = new PerplexCallToAction();
            _definitions.Add(block);
        }

        public void Terminate()
        {
            
        }


    }


    [RuntimeLevel(MinLevel = Umbraco.Core.RuntimeLevel.Run)]
    public class PerplexComposer : ComponentComposer<PerplexComponent> { }
}