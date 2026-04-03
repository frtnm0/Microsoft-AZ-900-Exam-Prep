const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./src/data/domain1.json', 'utf8'));

const easyQuestions = [
  {
    "id": 0,
    "q": "Which cloud concept ensures that services remain accessible with minimal downtime?",
    "opts": ["High Availability", "Scalability", "Elasticity", "Agility"],
    "ans": "High Availability",
    "exp": "High Availability ensures your applications and services are accessible virtually all the time."
  },
  {
    "id": 1,
    "q": "What is the ability of a system to handle increased load by adding resources?",
    "opts": ["Scalability", "Governance", "Latency", "Disaster Recovery"],
    "ans": "Scalability",
    "exp": "Scalability gives you the ability to increase computing capacity to manage higher workloads."
  },
  {
    "id": 2,
    "q": "Which cloud feature automatically scales resources up and down based on demand?",
    "opts": ["Elasticity", "Predictability", "CapEx", "PaaS"],
    "ans": "Elasticity",
    "exp": "Elasticity is the rapid and automated scaling (up and down) to meet fluctuating workload demands."
  },
  {
    "id": 3,
    "q": "What describes a system's ability to recover from failures and continue to function?",
    "opts": ["Reliability", "Scalability", "IaaS", "Governance"],
    "ans": "Reliability",
    "exp": "Reliability is the resilience of a system to recover from failures and keep performing as expected."
  },
  {
    "id": 4,
    "q": "Which benefit focuses on knowing what your cloud performance and costs will be?",
    "opts": ["Predictability", "Elasticity", "Agility", "Fault Tolerance"],
    "ans": "Predictability",
    "exp": "Predictability lets you accurately forecast resource performance and financial costs in the cloud."
  },
  {
    "id": 5,
    "q": "Protecting data, apps, and infrastructure in the cloud falls under which category?",
    "opts": ["Security", "High Availability", "Scalability", "CapEx"],
    "ans": "Security",
    "exp": "Security provides the tools to protect digital assets, data, and access in the cloud."
  },
  {
    "id": 6,
    "q": "Enforcing corporate standards and regulatory compliance in the cloud defines what?",
    "opts": ["Governance", "Elasticity", "Public Cloud", "Containers"],
    "ans": "Governance",
    "exp": "Governance ensures your deployment complies with corporate rules, legal standards, and cost limits."
  },
  {
    "id": 7,
    "q": "Which concept refers to efficiently deploying and tracking cloud resources?",
    "opts": ["Manageability", "CapEx", "Fault Tolerance", "Reliability"],
    "ans": "Manageability",
    "exp": "Manageability lets IT administrators efficiently provision, update, and manage cloud assets."
  },
  {
    "id": 8,
    "q": "Which process restores services after a catastrophic outage?",
    "opts": ["Disaster Recovery", "Scalability", "Microservices", "IaaS"],
    "ans": "Disaster Recovery",
    "exp": "Disaster Recovery aims to bring systems back online quickly after major catastrophic events."
  },
  {
    "id": 9,
    "q": "Which term describes a system experiencing zero downtime during a component failure?",
    "opts": ["Fault Tolerance", "PaaS", "CapEx", "Agility"],
    "ans": "Fault Tolerance",
    "exp": "Fault Tolerance implies a system will continue operating without any interruption if a piece of hardware fails."
  },
  {
    "id": 10,
    "q": "What is the time it takes for data to travel across a network called?",
    "opts": ["Latency", "Bandwidth", "Throughput", "Scalability"],
    "ans": "Latency",
    "exp": "Latency is the delay incurred by data traveling physically over a network connection."
  },
  {
    "id": 11,
    "q": "What is the upfront cost of purchasing physical infrastructure known as?",
    "opts": ["Capital Expenditure (CapEx)", "Operational Expenditure (OpEx)", "Hybrid Cloud", "TCO"],
    "ans": "Capital Expenditure (CapEx)",
    "exp": "CapEx refers to spending money upfront on physical assets that depreciate over time."
  },
  {
    "id": 12,
    "q": "Which financial model involves paying for cloud services as you use them?",
    "opts": ["Operational Expenditure (OpEx)", "Capital Expenditure (CapEx)", "IaaS", "Fault Tolerance"],
    "ans": "Operational Expenditure (OpEx)",
    "exp": "OpEx replaces heavy upfront hardware costs with flexible, ongoing monthly expenses based on usage."
  },
  {
    "id": 13,
    "q": "Which model charges you only for the exact resources you use?",
    "opts": ["Consumption-based Model", "CapEx", "Reserved Instances", "Bring Your Own License"],
    "ans": "Consumption-based Model",
    "exp": "A consumption-based billing model charges strictly for what is utilized, meaning no upfront fees."
  },
  {
    "id": 14,
    "q": "What metric estimates the comprehensive costs of a system over its lifetime?",
    "opts": ["Total Cost of Ownership (TCO)", "OpEx", "CapEx", "SLA"],
    "ans": "Total Cost of Ownership (TCO)",
    "exp": "TCO compares all direct and indirect expenses (power, labor, etc.) to evaluate profitability over time."
  },
  {
    "id": 15,
    "q": "Which cloud model gives you the most control over virtual machines and networking?",
    "opts": ["Infrastructure as a Service (IaaS)", "PaaS", "SaaS", "Serverless"],
    "ans": "Infrastructure as a Service (IaaS)",
    "exp": "IaaS lets you manage the operating system, network, and storage, just like on-premises."
  },
  {
    "id": 16,
    "q": "Which cloud model allows developers to deploy code without managing servers?",
    "opts": ["Platform as a Service (PaaS)", "IaaS", "SaaS", "CapEx"],
    "ans": "Platform as a Service (PaaS)",
    "exp": "PaaS abstracts away server maintenance, letting teams focus strictly on their software."
  },
  {
    "id": 17,
    "q": "Microsoft 365 is an example of which fully managed cloud service model?",
    "opts": ["Software as a Service (SaaS)", "PaaS", "IaaS", "Hybrid Cloud"],
    "ans": "Software as a Service (SaaS)",
    "exp": "SaaS provides a complete software solution that customers simply access and use over the internet."
  },
  {
    "id": 18,
    "q": "What defines the security tasks handled by the provider versus the customer?",
    "opts": ["Shared Responsibility Model", "TCO", "Governance", "Defense in Depth"],
    "ans": "Shared Responsibility Model",
    "exp": "This model divides operational and security ownership depending on whether you use IaaS, PaaS, or SaaS."
  },
  {
    "id": 19,
    "q": "Which model runs code without you having to provision or maintain any servers?",
    "opts": ["Serverless Computing", "IaaS", "Private Cloud", "CapEx"],
    "ans": "Serverless Computing",
    "exp": "Serverless automatically allocates infrastructure in the background triggered by events or workloads."
  },
  {
    "id": 20,
    "q": "Which deployment model involves services offered over the internet to anyone?",
    "opts": ["Public Cloud", "Private Cloud", "Hybrid Cloud", "Multi-Cloud"],
    "ans": "Public Cloud",
    "exp": "Public cloud resources are owned and operated by a third-party and accessible by the general public."
  },
  {
    "id": 21,
    "q": "Which cloud is used exclusively by a single business or organization?",
    "opts": ["Private Cloud", "Public Cloud", "Hybrid Cloud", "Multi-Cloud"],
    "ans": "Private Cloud",
    "exp": "A private cloud offers resources completely dedicated to one organization, providing more isolation."
  },
  {
    "id": 22,
    "q": "What combines both on-premises infrastructure and public cloud services?",
    "opts": ["Hybrid Cloud", "Single Cloud", "Serverless", "SaaS"],
    "ans": "Hybrid Cloud",
    "exp": "Hybrid setups share data and applications between private on-premises datacenters and the public cloud."
  },
  {
    "id": 23,
    "q": "Using services from multiple different cloud providers simultaneously is called?",
    "opts": ["Multi-Cloud", "Private Cloud", "Hybrid Cloud", "PaaS"],
    "ans": "Multi-Cloud",
    "exp": "Multi-cloud architecture strategy leverages Azure, AWS, Google Cloud, etc., at the same time."
  },
  {
    "id": 24,
    "q": "What do we call geographical areas containing multiple Azure datacenters?",
    "opts": ["Regions", "Availability Zones", "Resource Groups", "Subscriptions"],
    "ans": "Regions",
    "exp": "Regions are worldwide locations that contain connected datacenters."
  },
  {
    "id": 25,
    "q": "What are physically separate datacenters within a single Azure region?",
    "opts": ["Availability Zones", "Regions", "Tenants", "Management Groups"],
    "ans": "Availability Zones",
    "exp": "Availability Zones provide physical separation of datacenters to protect against localized failures."
  },
  {
    "id": 26,
    "q": "Two Azure regions located in the same geography linked for disaster recovery are?",
    "opts": ["Region Pairs", "Availability Zones", "Edge Nodes", "CDN"],
    "ans": "Region Pairs",
    "exp": "Region Pairs coordinate updates and failovers directly separated by hundreds of miles."
  },
  {
    "id": 27,
    "q": "Which Azure regions are dedicated to strict legal and compliance requirements?",
    "opts": ["Sovereign Regions", "Availability Zones", "Public Regions", "Open Regions"],
    "ans": "Sovereign Regions",
    "exp": "Sovereign Regions like Azure Government guarantee adherence to strict public sector compliance laws."
  },
  {
    "id": 28,
    "q": "What is the most basic building block in Azure, like a VM or database?",
    "opts": ["Resources", "Regions", "Resource Groups", "Subscriptions"],
    "ans": "Resources",
    "exp": "Resources are manageable components that you deploy and consume within Azure."
  },
  {
    "id": 29,
    "q": "Which logical container holds related Azure resources for an app?",
    "opts": ["Resource Groups", "Regions", "Management Groups", "Tenants"],
    "ans": "Resource Groups",
    "exp": "Resource Groups help organize resources that share the same lifecycle, permissions, and policies."
  },
  {
    "id": 30,
    "q": "What is the deployment and management service for Azure?",
    "opts": ["Azure Resource Manager (ARM)", "Azure Active Directory", "Azure Policy", "Azure Monitor"],
    "ans": "Azure Resource Manager (ARM)",
    "exp": "ARM is the management layer that lets you create, update, and delete resources using templates or API calls."
  },
  {
    "id": 31,
    "q": "What provides the primary billing boundary for your Azure usage?",
    "opts": ["Subscriptions", "Resource Groups", "Management Groups", "Regions"],
    "ans": "Subscriptions",
    "exp": "An Azure subscription is an agreement that groups resource usage to a specific billing account."
  },
  {
    "id": 32,
    "q": "What helps you manage access, policy, and compliance across multiple subscriptions?",
    "opts": ["Management Groups", "Resource Groups", "Availability Zones", "Tenants"],
    "ans": "Management Groups",
    "exp": "Management Groups act as hierarchical folders organizing multiple subscriptions for unified governance."
  },
  {
    "id": 33,
    "q": "What represents a dedicated and trusted instance of Microsoft Entra ID (Azure AD)?",
    "opts": ["Azure Tenant", "Subscription", "Resource Group", "Management Group"],
    "ans": "Azure Tenant",
    "exp": "An Azure Tenant is your organization's specific instance of Azure active directory for managing identities."
  },
  {
    "id": 34,
    "q": "Increasing the RAM or CPU of an existing server is an example of what?",
    "opts": ["Vertical Scaling", "Horizontal Scaling", "Elasticity", "High Availability"],
    "ans": "Vertical Scaling",
    "exp": "Vertical scaling (scaling up) involves making an existing server larger or more powerful."
  },
  {
    "id": 35,
    "q": "Adding more virtual machines to distribute incoming traffic is called?",
    "opts": ["Horizontal Scaling", "Vertical Scaling", "Fault Tolerance", "CapEx"],
    "ans": "Horizontal Scaling",
    "exp": "Horizontal scaling (scaling out) involves adding more identical servers behind a load balancer."
  },
  {
    "id": 36,
    "q": "Breaking an application down into small, independent services represents what?",
    "opts": ["Microservices", "Monolith", "IaaS", "Legacy Systems"],
    "ans": "Microservices",
    "exp": "Microservice architecture decouples monolithic applications into modular deployable micro pieces."
  },
  {
    "id": 37,
    "q": "What packages an application and its dependencies into a single isolated unit?",
    "opts": ["Containers", "Virtual Machines", "Subscriptions", "Regions"],
    "ans": "Containers",
    "exp": "Containers virtualize the operating system to run apps reliably in any computing environment."
  },
  {
    "id": 38,
    "q": "Older on-premises computer systems or applications are commonly referred to as?",
    "opts": ["Legacy Systems", "Microservices", "Serverless", "Native Cloud Apps"],
    "ans": "Legacy Systems",
    "exp": "Legacy systems are outdated systems that organizations typically work to modernize or migrate."
  },
  {
    "id": 39,
    "q": "The process of moving digital assets to a cloud environment is known as?",
    "opts": ["Cloud Migration", "Scaling Out", "Governance", "CapEx"],
    "ans": "Cloud Migration",
    "exp": "Cloud Migration is the strategic process of safely moving servers, data, and software off-premises to the cloud."
  }
];

easyQuestions.forEach(eq => {
  const item = data[eq.id];
  if (item) {
    const existingLink = item.questions.length > 0 ? item.questions[0].link : "";
    item.questions.push({
      type: "easy",
      question: eq.q,
      options: eq.opts,
      answer: eq.ans,
      explanation: eq.exp,
      link: existingLink
    });
  }
});

fs.writeFileSync('./src/data/domain1.json', JSON.stringify(data, null, 2));
console.log('Update complete.');
